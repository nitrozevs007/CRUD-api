function logAllPairs(arr){
  for(let i = 0; i < arr.length; i++){
    let api = 'https://task-dev-kom.vercel.app/api';
    let tbody = document.getElementById('tbody');
    
    let nameInput = document.getElementById('name');
    let ageInput = document.getElementById('age');
    let addressInput = document.getElementById('adress');
    let emailInput = document.getElementById('email');
    const saveForm = document.getElementById('save-btn');
    const postForm = document.getElementById('add-btn');
    
    let userId;
    let allData = [] 

    const getData = async ( ) => {
      try {
        const response = await fetch(`${api}/all-friends`);
        const data = await response.json();
        allData.push(data)
        tbody.innerHTML = "";
        data.forEach((value, index) => {
          tbody.innerHTML += `
          <tr>
            <td>${value.name}</td>
            <td>${value.age}</td>
            <td>${value.adress}</td>
            <td>${value.email}</td>
            <td>
              <button type="button" class="edit-btn" student-id=${ value._id }>Edit</button>
              <button type="button" class="delete-btn" student-id=${ value._id }>Delete</button>
            </td>
          </tr>`;
        });
        addEventListeners();
      } catch (error) {
        console.log(error);
      }
    };
    getData();

    function addEventListeners() {
      document.querySelectorAll('.edit-btn').forEach(item => {
        item.addEventListener('click', e => {
          const studentId = e.target.getAttribute('student-id');
          const studentData = allData.find(val => val._id === studentId);
          if (studentData) {
            nameInput.value = studentData.name;
            ageInput.value = studentData.age;
            addressInput.value = studentData.adress;
            emailInput.value = studentData.email;
            userId = studentId;
          }            
        });
      });

      document.querySelectorAll('.delete-btn').forEach(item => {
        item.addEventListener('click', e => {
          userId = e.target.getAttribute('student-id');
          deleteUser(userId);
        });
      });
    }

    postForm.addEventListener('click', e => {
      e.preventDefault();
      const data = {
        name: nameInput.value,
        age: ageInput.value,
        adress: addressInput.value,
        email: emailInput.value,
      };
      userId ? updateData(userId, data) : postData(data);
    });

    const postData = async data => {
      try {
        const response = await fetch(`${api}/add-friend-details`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(data),
        });
        getData();
      } catch (error) {
        console.log(error);
      }
    };

    async function updateData(id, updateData) {
      try {
        await fetch(`${api}/update-friend/${id}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(updateData),
        });
        getData();
      } catch (error) {
        console.log(error);
      }
    }

    async function deleteUser(id) {
      try {
        await fetch(`${api}/delete-friend/${id}`, {
          method: 'DELETE',
        });
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

logAllPairs([1]);
