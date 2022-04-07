export async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    console.log('res::::::',res);
    
    return res.json()
}