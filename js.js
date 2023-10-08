let create_btn=document.getElementById('create_btn');
let delete_btn=document.getElementById('delete_btn');
let delete_count=document.getElementById('delete_count');
let total_text=document.getElementById('total_text');

let title=document.getElementById('title');
let price_item=document.getElementById('price_item');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let category=document.getElementById('category');

let table_body=document.getElementById('table_body');


//-----search var
let search=document.getElementById('search');
let search_by_title=document.getElementById('search_by_title');
let search_by_category=document.getElementById('search_by_category');

delete_count.innerHTML=0;
//-------- variables ---------
let mood ='create';
let temp;
//----------get total function-------------
function get_Total() //on keyup event in html 4 items
{
    if(price_item.value !='')
    {
        total_text.innerHTML=+price_item.value + +taxes.value + +ads.value + +discount.value;
        total.style.background='green';

    }
    else{
        total.style.background='rgb(131, 126, 152)';
        total_text.innerHTML='';
    }
}



//---------local storage and data-----------
let data_items;
if (localStorage.product != null)
{
    data_items=JSON.parse(localStorage.product);
}
else
{
    data_items=[];
}


//---------add item-----------
create_btn.addEventListener("click", ()=>{
    let item_details={
        'title':title.value ,
        'price':price_item.value,
        'taxes':taxes.value ,
        'ads':ads.value,
        'discount':discount.value,
        'total_text':total_text.innerHTML,
        'category':category.value
    }
    if(mood=='create')
    {
        for(let i=0;i< +count.value ;i++)
        {
            data_items.push(item_details);
        } 
    }
    else
    {
        data_items[temp]=item_details;
    }
    total_text.innerHTML='';
    total.style.background='rgb(131, 126, 152)';
    localStorage.setItem('product',JSON.stringify(data_items))
    clear_boxes();
    show_data(data_items);
    create_btn.innerHTML='Create';

})

//----------clear data from boxes --------------
function clear_boxes()
{
    title.value='';
    price_item.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
}


//-------------show data on table---------------
show_data(data_items); //to show when reload page
function show_data(data_items)
{
    let html_code='';//make it empty not un defined to previent print undefind for empty data
    for(let i =0;i<data_items.length;i++)
    {
        html_code +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${data_items[i].title}</td>
                        <td>${data_items[i].price}</td>
                        <td>${data_items[i].taxes}</td>
                        <td>${data_items[i].ads}</td>
                        <td>${data_items[i].discount}</td>
                        <td>${data_items[i].total_text}</td>
                        <td>${data_items[i].category}</td>
                        <td><button onclick='update_selected_Data(${i})' id="update_item" type="button">update</button></td>
                        <td><button onclick='delete_selected_Data(${i})' id="delete_item" type="button">delete</button></td>
                    </tr>`;
    }
    table_body.innerHTML=html_code;
    if(data_items.length>0)
    {
        delete_count.innerHTML=data_items.length;
    }
}




//--------delete all data------------
delete_btn.addEventListener('click',()=>
{
    localStorage.clear();
    data_items.splice(0);//0 to delete all items
    show_data(data_items);//to refresh table show 
    delete_count.innerHTML=data_items.length;
})

//--------delete selected data------------
function delete_selected_Data(i)
{
    data_items.splice(i,1);
    localStorage.product=JSON.stringify(data_items);
    show_data(data_items);
    delete_count.innerHTML=data_items.length;

}

//--------update selected data------------
function update_selected_Data(i)
{
    title.value=data_items[i].title;
    price_item.value=data_items[i].price;
    taxes.value=data_items[i].taxes;
    ads.value=data_items[i].ads;
    discount.value=data_items[i].discount;
    count.style.display='none';
    category.value=data_items[i].category;
    total_text.innerHTML=data_items[i].total_text;
    mood='update';
    create_btn.innerHTML='Update';
    temp=i;
}


//------------search----------------
let mood_search='Title';
//default place holder
search.setAttribute('placeholder','Search By '+mood_search);
function getSearchByTxt() //add to html file
{
    let arr=[];
    let input_text = search.value;
    if(input_text.value!='')
    {
        for(let i=0;i<data_items.length;i++)
        {
            if(mood_search=='Category' &&data_items[i].category.includes(input_text))
            {
                arr.push(data_items[i]);
            }
            else if(mood_search=='Title' && data_items[i].title.includes(input_text))
            {
                arr.push(data_items[i]);
            }   
        }
    }


    show_data(arr);
}

function searchby_btn(i)//addto html file 2 items
{

    if(i=='search_by_title') 
    {
        mood_search='Title';
    }
    else
    {
        mood_search='Category';
    }
    search.setAttribute('placeholder','Search By '+mood_search);
    search.value='';
    search.style.scale='1';
    show_data(data_items);
    // search.focus();
    // search.style.scale='1.08';
    // search.setAttribute('placeholder','Search By ' + mood_search);
    
}

