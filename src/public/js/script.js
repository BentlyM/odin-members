const handleDelete =  async (messageId) => {
    const response = await fetch(`http://127.0.0.9:8080/${messageId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(!response.ok) throw new Error(`failed to delete message: ${response.statusText}`);

    const messageNode = document.querySelector(`li[data-id="${messageId}"]`);
    const message = await response.json(); 

    if(messageNode && message){
        messageNode.remove();
    }
    
}