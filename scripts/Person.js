function Person (jsonPerson) {

    this.name = jsonPerson.name;
    this.phone = jsonPerson.phone;
    this.avatar = jsonPerson.avatar;
    this.address = new Address(jsonPerson.address);
    
}

Person.prototype.getAddress = function () {

    return this.address;

};

Person.prototype.matches = function (criteria) {

    return this.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1; 
    

}