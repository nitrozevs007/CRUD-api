const elNameInput = document.getElementById('name')
const elAgeInput = document.getElementById('age')
const elAddressInput = document.getElementById('address')
const elEmailInput = document.getElementById('email')
const addBtn = document.getElementById('add-btn')
const table = document.getElementById('table')
let userId;

const apiGet = "https://task-dev-kom.vercel.app/api/all-friends"
const apiPost = "https://task-dev-kom.vercel.app/api/add-friend-details"
const apiPut = "https://task-dev-kom.vercel.app/api/update-friend"
const apiDelete = "https://task-dev-kom.vercel.app/api/delete-friend"


document.addEventListener('DOMContentLoaded', function () {

  async function getData() {
    try {
      const response = await fetch(apiGet)
      const data = await response.json()

      data.forEach((value) => {
        table.innerHTML += `
        <tr>
            <td>${value.name}</td>
            <td>${value.age}</td>
            <td>${value.adress}</td>
            <td>${value.email}</td>
            <td class="btn-action">
                <button id="delete-btn" class="delete-btn">Delete</button>
                <button class="edit-btn" id="edit-btn">Edit</button>
            </td>
        </tr>
        `
      });

      document.querySelectorAll('#edit-btn').forEach(item => {
        item.addEventListener('click', e => {
          const studentId = e.target.attributes ['student-id']

          const studentData = data.find(val => val.id === studentId.value)
          if(studentData) {
            elNameInput.value = studentData.name
            elAgeInput.value = studentData.age
            elAddressInput.value = studentData.adress
            elEmailInput.value = studentData.email 
            userId = studentId.value
          }
        })
      })
      
    } catch (error) {
      console.log(error);
    }
  }
  getData()

}
)