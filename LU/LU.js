
let n = document.querySelector('#input_n').value;

let table = document.querySelector('table');
let mainBlock = document.querySelector('.main_block')
let Text1 = document.querySelector('#text1')
let Text2 = document.querySelector('#text2')
let results1 = document.querySelector('#results1')
let A = Array();
let B = Array();
let result = Array();
const Text_L = document.createTextNode(`Матрица L:`);
const Text_U = document.createTextNode(`Матрица U:`);
const Text_X = document.createTextNode(`Вектор решения X:`);
let text1 = document.createTextNode("Введите матрцу левой части:");
let text2 = document.createTextNode("Введите столбец правой части:");
let text_error = document.createTextNode("Ошибка в вводе данных!");


document.querySelector('#enter').onclick = Enter;
document.querySelector('#reset_input').onclick = Reset_in;
document.querySelector('#reset_output').onclick = Reset_out;
document.querySelector('#LU').onclick = Calc;


const tbl = document.createElement("table");
const tbl_B = document.createElement("table");

const tbl_L = document.createElement("table");
const tbl_U = document.createElement("table");
const tbl_X = document.createElement("table");

function Enter()
{


    n = document.querySelector('#input_n').value;

    if(n<=0)
    {
        alert("Отрицательная размерность!!!!")
        return;
    }
    let Rand = document.querySelector('#rand').checked;

    const tblB = document.createElement("tbody");
    tblB.id = `input_B`
    let element = document.getElementById('input_matrix');

    const tblBody = document.createElement("tbody");
    tblBody.id = `input_matrix`
    if (element === null)
    {

        Text1.after(text1);
        for (let i = 0; i < n; i++)
        {
            const row = document.createElement("tr");
            row.id = `input_matrix[${i}]`

            for (let j = 0; j < n; j++)
            {
                const cell = document.createElement("td");
                const cellInput = document.createElement("input")
                cellInput.type = "text";
                cellInput.className = "input_mat";
                cellInput.id = `input_matrix[${i}][${j}]`
                if (Rand)
                    cellInput.value = getRandom(-100,100).toFixed(0);
                cell.appendChild(cellInput);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        mainBlock.appendChild(tbl);

        for (let i = 0; i < n; i++)
        {
            const row = document.createElement("tr");
            row.id = "input_B"
            const cell = document.createElement("td");
            const cellInput = document.createElement("input")
            cellInput.type = "text";
            if (Rand)
                cellInput.value = getRandom(-100,100).toFixed(0);
            cellInput.className = "input_mat";
            cellInput.id = `input_B[${i}]`
            cell.appendChild(cellInput);
            row.appendChild(cell);
            tblB.appendChild(row);
        }


        tbl_B.appendChild(tblB);
        Text2.appendChild(tbl_B)
        Text2.before(text2);


        document.getElementById("input_n").disabled = true;

    }
    else if (element != null) {
        //alert("Сначала нажмите сборс!");
        Reset_in();
        Enter();
    }
}


function Clear_table(string)
{
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(string+`[${i}][${j}]`).remove()
        }
        document.getElementById(string+`[${i}]`).remove()
    }
    document.getElementById(string).remove()


}
function Reset_in()
{

    if (document.getElementById('input_matrix') === null)
    {

    }
    else
    {
        n = document.querySelector('#input_n').value;
        let check1  = document.getElementById('L_matrix')
        if( check1 === null)
        {
            document.getElementById("input_n").disabled = false;
        }

        Clear_table("input_matrix");

        for (let i = 0; i < n; i++) {
            document.getElementById(`input_B[${i}]`).remove()
        }
        document.getElementById('input_B').remove()

        text_error.remove()
        text1.remove();
        text2.remove();
    }


}
function Reset_out()
{

    if (document.getElementById('L_matrix') === null)
    {

    }
    else
    {
        let check2  = document.getElementById('input_matrix')
        if( check2 === null)
        {
            document.getElementById("input_n").disabled = false;
        }

        document.querySelector('#LU').disabled = false;
        n = document.querySelector('#input_n').value;
        Clear_table("U_matrix");
        Clear_table("L_matrix");
        text_error.remove()
        Text_L.remove();
        Text_U.remove();
        Text_X.remove();
        tbl_L.remove()
        tbl_U.remove()
        tbl_X.remove()

        for (let i = 0; i < n; i++) {
            document.getElementById(`X[${i}]`).remove()
        }
        document.getElementById('X').remove()
    }


}


function Calc()
{


    let check  = document.getElementById('L_matrix')
    if (check === null)
    {

        let element=document.getElementById('input_matrix');

        if (element === null)
            alert("Сначала задайте матрицу!");
        else
        {
            //1. "A" -- данная матрица
            let e = document.querySelector('#input_e').value;
            if(e<=0)
            {
                alert("Отрицательное количество знаков после запятой в решении!!!!")
                return;
            }
            n = document.querySelector('#input_n').value;
            for (let i = 0; i < n; i++) {
                A[i] = Array();
                for (let j = 0; j < n; j++) {
                    A[i][j] = Number(document.getElementById(`input_matrix[${i}][${j}]`).value)
                    B[j] = Number(document.getElementById(`input_B[${j}]`).value)

                }
            }
            //console.log((typeof(B[0])))

            let LU = lu(A, e);
            let L = LU[0];
            let U = LU[1];
            //вывод L
            {
                results1.appendChild(Text_L);
                const LBody = document.createElement("tbody");
                LBody.id = `L_matrix`;
                for (let i = 0; i < n; i++) {
                    const row = document.createElement("tr");
                    row.id = `L_matrix[${i}]`
                    for (let j = 0; j < n; j++) {
                        const cell = document.createElement("td");
                        const cellText = document.createTextNode(`${L[i][j]}`)
                        cellText.type = "text";
                        cellText.className = "result_cell";
                        cell.id = `L_matrix[${i}][${j}]`
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                    LBody.appendChild(row);
                }
                tbl_L.appendChild(LBody);
                tbl_L.setAttribute('class', 'result_matrix');
                results1.appendChild(tbl_L);
            }
            //вывод U
            {
                results1.appendChild(Text_U);
                const UBody = document.createElement("tbody");
                UBody.id = `U_matrix`;
                for (let i = 0; i < n; i++) {
                    const row = document.createElement("tr");
                    row.id = `U_matrix[${i}]`
                    for (let j = 0; j < n; j++) {
                        const cell = document.createElement("td");
                        const cellText = document.createTextNode(`${U[i][j]}`)
                        cellText.type = "text";
                        cellText.className = "result_cell";
                        cell.id = `U_matrix[${i}][${j}]`
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                    UBody.appendChild(row);
                }
                tbl_U.appendChild(UBody);
                tbl_U.setAttribute('class', 'result_matrix');
                results1.append(tbl_U);
            }
            let X = Solve(L, U, B)
            if( !isFinite(X[0]) || isNaN(X[0]))
            {
                results1.append(text_error);
            }
            else
            {
                //вывод X
                {
                    results1.append(Text_X)

                    const X_body = document.createElement("tbody");
                    X_body.id = "X"
                    for (let i = 0; i < n; i++) {
                        const row = document.createElement("tr");
                        row.id = "X"
                        const cell = document.createElement("td");
                        result[i] = Number(X[i]).toFixed(e);
                        const cellText = document.createTextNode(`X[${i}] = ${result[i]}`)
                        cellText.type = "text";
                        cell.className = "result_matrix";
                        cell.id = `X[${i}]`
                        cell.append(cellText);
                        row.append(cell);
                        X_body.append(row);
                    }
                    results1.append(X_body);
                    tbl_X.setAttribute('class', 'result_matrix');
                }
            }

        }


    }
    else if( check != null)
    {

        Reset_out();
        Calc();
    }


}



const lu = (mat,e) =>
{
    let lower = [],upper = [],n=mat.length;
    for(let i=0;i<n;i++){
        lower.push([]);
        upper.push([]);
        for(let j=0;j<n;j++){
            lower[i].push(0);
            upper[i].push(0);
        }
    }
    for (let i = 0; i < n; i++) {
        for (let k = i; k < n; k++){
            let sum = 0;
            for (let j = 0; j < i; j++)
                sum += (lower[i][j] * upper[j][k]);
            upper[i][k] = (mat[i][k] - sum).toFixed(e);
        }
        for (let k = i; k < n; k++) {
            if (i === k)
                lower[i][i] = 1;
            else{
                let sum = 0;
                for (let j = 0; j < i; j++)
                    sum += (lower[k][j] * upper[j][i]);
                lower[k][i] = ((mat[k][i] - sum) / upper[i][i]).toFixed(e);
            }
        }
    }
    return [lower,upper];
}
const Solve = (L,U,B) =>
{
    n=L.length;
    let x = Array();
    let y = Array();
    y[0] = B[0];
    for(let i=1;i<n;i++)
    {
        let sum=0;
        for (let j = 0; j <= i-1; j++)
            sum += L[i][j]*y[j];
        y[i] = B[i]-sum;
    }

    x[n-1] = y[n-1]/U[n-1][n-1]
    for(let i=2;i<=n;i++)
    {
        let sum=0;
        for (let j = 1; j <= i-1; j++)
            sum += U[n-i][n-j]*x[n-j];
        x[n-i] = (y[n-i]-sum)/U[n-i][n-i]
    }
    return x;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
