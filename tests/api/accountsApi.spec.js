const { test, expect, request } = require('@playwright/test');
const { createTestUser, deleteTestUser } =require('../../utils/testUserUtils');

test('Create Account ', {
    annotation: {
        type: 'testcase',
        description: 'CrtAcc_TC_01'
    }
}, async({request}) => {
    let email = 'CrAccTest_user_'+Date.now()+'@gmail.com';
    let password = '123'
    const accResponse = await request.post('createAccount', {
        form: {
            name: 'Saba',
            email: email,
            password: password,
            firstname: 'Saba',
            lastname: 'Ali',
            address1: 'add1',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            mobile_number: ''
        }
    });
    const respJson = await accResponse.json();
    console.log(respJson);
    expect(accResponse.status()).toBe(200);
    expect(respJson.responseCode).toBe(201);
    expect(respJson.message).toContain('User created!');
    expect(await deleteTestUser(request, email, password)).toBeTruthy();
})

test('Create Duplicate Account ', {
    annotation: {
        type: 'testcase',
        description: 'CrtAcc_TC_02'
    }
}, async ({ request }) => {
    const acctCreate = await createTestUser(request);
    expect(acctCreate).toMatchObject({
        email: expect.any(String),
        password: expect.any(String)
    });
    const accResponse = await request.post('createAccount', {
        form: {
            name: 'Saba',
            email: acctCreate.email,
            password: acctCreate.password,
            firstname: 'Saba',
            lastname: 'Ali',
            address1: 'add1',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            mobile_number: ''
        }
    });
    const respJson = await accResponse.json();
    console.log(respJson);
    expect(accResponse.status()).toBe(200);
    expect(respJson.responseCode).toBe(400);
    expect(respJson.message).toContain('Email already exists!');
    expect(await deleteTestUser(request, acctCreate.email, acctCreate.password)).toBeTruthy();
})

test('Delete Existing Account', {
    annotation: {
        type: 'testcase',
        description: 'DltAcc_TC_01'
    }
}, async({request}) => {
    const acctCreate = await createTestUser(request);
    expect(acctCreate).toMatchObject({
        email: expect.any(String),
        password: expect.any(String)
    })
    const accResponse = await request.delete('deleteAccount', {
        form: {
            email: acctCreate.email,
            password: acctCreate.password
        }
    });
    const respJson = await accResponse.json();
    console.log(respJson);
    expect(accResponse.status()).toBe(200);
    expect(respJson.responseCode).toBe(200);
    expect(respJson.message).toContain('Account deleted!');

})

test('Delete Non-existing Account', {
    annotation: {
        type: 'testcase',
        description: 'DltAcc_TC_02'
    }
}, async({request}) => {
    const AccResponse = await request.delete('deleteAccount', {
        form: {
            email: 'saba@gmail.com',
            password: '123'
        }
    });
    const respJson = await AccResponse.json();
    console.log(respJson);
    expect(AccResponse.status()).toBe(200);
    expect(respJson.responseCode).toBe(404);
    expect(respJson.message).toContain('Account not found!');

})