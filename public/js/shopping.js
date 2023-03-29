// $function() {
//     const callback = function(event) {
//         event.preventDefault();
//         const input = $('input[type=text][name=item]');

//         value= input.val(),
//         need = ($(event.target).attr('id') === 'addNeed'),

//         item = $('<li><input type="checkbox" name="item"> '+ value + ' <a href="#">remove</a></li>'),

//         list = (need) ? $('ul').first() : $('ul').last();

//         input.val("");
//         input.focus();

//         if (value === "") return;

//         if (!need) {
//             item.find('input').attr('checked', true);
//         }

//         $('#addHave, #addNeed').click(callback);

//         $('ul').on('click', 'li a', function(event) {
//             $(event.target).parent('li').remove();
//         });

//         $('ul').on('click', 'input[type=checkbox]', function(event) {
//             const listItem = $(event.target).parent('li'),
//             list = (event.target.checked) ? $('ul').last() : $('ul').first();
//             listItem.appendTo(list);
//         })
//     }
// }



const itembtn = document.getElementById('item-btn')

itembtn.addEventListener('click', async function() {
    const name = document.getElementById('itemList').value
    console.log(name)
    if (name) {
        
            const res = await fetch('/api/shoppingList', {
                method: 'POST',
                body: JSON.stringify({name}), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                res.render('shopping', { name })
                // document.location.reload()
            } else {
                alert('Something Went Wrong')
            }
        
    }
})



// console.log($("#itemList").find(':selected').attr('data-category'));
// const price = $("#itemList").find(':selected').attr('data-price');
// const itemList = document.getElementById('itemList');
// const category = $("#itemList").find(':selected').attr('data-category');