const handleDelete =  async (messageId) => {
    console.log(`message: you tried to delete number ${1}`);
    const response = await fetch('/',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok) return console.log('failed to delete message');

    const item = document.querySelector(`li[data-id="${messageId}"]`);

    if(item){
        item.remove();
    }
    
}