let b1 = document.querySelector("button");
let field = document.querySelector("#usdAmount");
let container = document.querySelector("#result");

b1.addEventListener("click",
    ()=>
    {
        let str = field.value ;
        let num = parseFloat(str);
        if(str===""|| num<0)
        {
            alert("please enter valid input");
            field.value = "";
            return;
        }
        fetchApi(num);
    }
);
function fetchApi(num)
{
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then((response)=>{ return response.json();})
    .then((data)=>{
        let { rates } = data;
        let total = rates.INR * num;
        container.textContent = `$ ${num} = Rs. ${total}`;
    })
    .catch((error)=> console.log(error));

}