
async function createTestUser(request){
    let email = 'test_user_'+Date.now()+'@gmail.com';
    let password = '123'
    const response = await request.post('https://automationexercise.com/api/createAccount', {
        form: {
            name: 'Test',
            email: email,
            password: password,
            firstname: 'Test',
            lastname: 'User',
            address1: 'add1',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            mobile_number: ''
        }
    })

    let respJson = await response.json();

    if(respJson.responseCode == 201){
        return {
            email, password
        }
    }else{
        throw Error('User Creation Failed');
    }
}

async function deleteTestUser(request, email, password){
    const response = await request.delete('https://automationexercise.com/api/deleteAccount',{
        form: {
            email: email,
            password: password

        }
    })

    const respJson = await response.json();
    if(respJson.responseCode ==200){
        return true;
    }else{
        return false;
    }
}

module.exports = { createTestUser, deleteTestUser };