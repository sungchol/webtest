const cellContainer = document.querySelector("#cellContainer");
const gridLine = document.querySelector("#gridLine");

const posCell = cellContainer.getBoundingClientRect();
const posGrid = gridLine.getBoundingClientRect();
console.log(posCell.x, posCell.y, posGrid.x, posGrid.y);

//오목 셀만들기
for(let i =0 ; i< 400; i++)
{
   const myDiv = document.createElement("div");
   myDiv.setAttribute("cellIndex", `${i}`);
   myDiv.setAttribute("class", "cell");
   cellContainer.appendChild(myDiv);
}

//gridLine 만들기
for (let i=0; i<19*19; i++)
{
    const myCell = document.createElement("div");
    myCell.setAttribute("class", "gridCell");
    gridLine.appendChild(myCell);
}

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart");
const backBtn = document.querySelector("#back");

let options = new Array();
let posOrder = new Array(); //놓은 순서기억 push, pop
let currentPlayer = "●";
let running = false;

initializeGame();


function initializeGame() {
    cells.forEach(cell => 
        cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    backBtn.addEventListener("click", backGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    
    for(let i =0 ; i<400; i++) {
        options[i] = "";
    }
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    //console.log(posOrder);
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    const order = {player: currentPlayer, index: index};
    posOrder.push(order);
}

function changePlayer(){
    currentPlayer = (currentPlayer == "●") ? "◎" : "●";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner()
{
    let roundWon = false;

    for(let y=0; y<20; y++)
    {
        for(let x=0 ; x<20; x++) {
            //검사위치 값이 현player && (x=0 또는 (x-1) != 현플레이어)
            if(options[y*20+x] == currentPlayer) {
                
                //경우1 : x축방향으로 쭉이어진경우
                if(x==0 || (x>0 && options[y*20+x-1] != currentPlayer)) {
                    //x축이동공간이 5칸 || x축이동공간 6칸이상이면서 (6칸) != 현플레이어
                    if(x==15 || (x<15 && options[y*20+x+5] !=currentPlayer))
                    {
                        //4칸연속 현플레이어이면 승리조건충족
                        roundWon = true;
                        for(let i=0; i<4;i++) {
                            if(options[y*20+x+i+1] != currentPlayer) {
                                roundWon = false;
                                break;
                            }    
                        }

                        if(roundWon){
                            break;
                        }
                    }
                }

                //경우2 : y축방향으로 쭉이어진경우
                if(y==0 || (y>0 && options[(y-1)*20+x] != currentPlayer)) {
                    //y축이동공간이 5칸 or y축이동공간 6칸이상이면서 (6칸) != 현플레이어
                    if(y==15 || (y<15 && options[(y+5)*20+x] !=currentPlayer))
                    {
                        //4칸연속 현플레이어이면 승리조건충족
                        roundWon = true;
                        for(let i=0; i<4;i++) {
                            if(options[(y+i+1)*20+x] != currentPlayer) {
                                roundWon = false;
                                break;
                            }    
                        }

                        if(roundWon){
                            break;
                        }
                    }
                }

                //경우3 : 45도 방향으로 쭉 이어진경우
                if(x==0 || y==0 || (x>0 && y>0 && options[(y-1)*20+(x-1)] != currentPlayer)) {
                    //y축이동공간이 5칸 || y축이동공간 6칸이상이면서 (6칸) != 현플레이어
                    if(x==15 || y==15 || (y<15 && x<15 && options[(y+5)*20+(x+5)] !=currentPlayer))
                    {
                        //4칸연속 현플레이어이면 승리조건충족
                        roundWon = true;
                        for(let i=0; i<4;i++) {
                            if(options[(y+i+1)*20+(x+i+1)] != currentPlayer) {
                                roundWon = false;
                                break;
                            }    
                        }

                        if(roundWon){
                            break;
                        }
                    }
                }

                //경우4 : 135도 방향으로 쭉 이어진경우
               if(x==19 || y==19 || (x<19 && y<19 && options[(y-1)*20+(x+1)] != currentPlayer)) {
                    //y축이동공간이 5칸 || y축이동공간 6칸이상이면서 (6칸) != 현플레이어
                    if(x==4 || y==4 || (y>4 && x>4 && options[(y+5)*20+(x-5)] !=currentPlayer))
                    {
                        //4칸연속 현플레이어이면 승리조건충족
                        roundWon = true;
                        for(let i=0; i<4;i++) {
                            if(options[(y+i+1)*20+(x-i-1)] != currentPlayer) {
                                roundWon = false;
                                break;
                            }    
                        }

                        if(roundWon){
                            break;
                        }
                    }
                }
            }
        }

        if(roundWon) {
            break;
        }
        
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!!`;
    }
    else {
        changePlayer();
    }

}

//재시작, 변수초기화
function restartGame() {
    currentPlayer = "●";
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = ``);
    for(let i =0 ; i<400; i++) {
        options[i] = "";
    }
    //놓은 순서기억공간 초기화
    posOrder.length = 0;
    running = true;
}

//한단계 뒤로 이동하기 posOrder 스택 pop
function backGame() {
    const count = posOrder.length;
    if(count > 0) {
        const pos = posOrder.pop();

        options[pos.index] = "";
        
        //화면지우기
        for(let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if(cell.getAttribute("cellIndex") == pos.index) {
                cell.textContent = "";
                break;
            };
        }

        running = true;
        //changePlayer();
        currentPlayer=pos.player;
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}

