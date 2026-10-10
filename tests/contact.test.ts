import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactSchema, emailContent } from '../src/lib/contact';
const valid={name:'Alex',email:'alex@example.com',message:'We need a new customer portal.',timeline:'Just exploring',services:['Custom software']};
test('accepts a valid enquiry and rejects malformed or oversized input',()=>{assert.equal(contactSchema.safeParse(valid).success,true);for(const input of [{...valid,email:'bad'},{...valid,message:'short'},{...valid,message:'x'.repeat(5001)},{...valid,services:['Unapproved service']}])assert.equal(contactSchema.safeParse(input).success,false);});
test('escapes visitor content in email HTML without altering the plain text',()=>{const data=contactSchema.parse({...valid,name:'<script>bad</script>',message:'<img src=x onerror=alert(1)> & hello'});const email=emailContent(data);assert.ok(!email.htmlContent.includes('<script>'));assert.ok(!email.htmlContent.includes('<img'));assert.ok(email.htmlContent.includes('&lt;img'));assert.ok(email.textContent.includes('<img'));});
