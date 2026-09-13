const { test, expect } = require('@playwright/test');
const { insertUser, findUserByEmail, countUsersByStatus } = require('../../utils/db');
const { seedDb } = require('../../utils/seedDb.js');

test.beforeEach(async() => {
    seedDb();
})

test('Newly inserted user persists in DB with correct values', {
    annotation: {
        type: 'testcase',
        description: 'DBVal_TC_01'
    }
}, async() => {
    const newUser = insertUser('TestUser1', 'testuser1@gmail.com', 'active');
    //console.log(newUser);
    expect(newUser.name).toBe('TestUser1');
    expect(newUser.email).toBe('testuser1@gmail.com');
    expect(newUser.status).toBe('active');
})

test('Duplicate user email is rejected by DB constraint', {
    annotation: {
        type: 'testcase',
        description: 'DBVal_TC_02'
    }
}, async() => {
    const newUser = insertUser('TestUser2', 'testuser2@gmail.com', 'active');
    expect(newUser.email).toBe('testuser2@gmail.com');
    expect(() => insertUser('TestUser2', 'testuser2@gmail.com', 'active') ).toThrowError('UNIQUE constraint failed: users.email');
})

test('User Status sets as active by default in DB', {
    annotation: {
        type: 'testcase',
        description: 'DBVal_TC_03'
    }
}, async() => {
    const newUser = insertUser('TestUser3', 'testuser3@gmail.com');
    //console.log(newUser);
    expect(newUser.name).toBe('TestUser3');
    expect(newUser.email).toBe('testuser3@gmail.com');
    expect(newUser.status).toBe('active');
})
