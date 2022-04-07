export async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    
    return res.json()
}