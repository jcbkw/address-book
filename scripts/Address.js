function Address (jsonAddress) {

    this.street = jsonAddress.street;
    this.street2 = jsonAddress.street2 || "";
    this.city = jsonAddress.city;
    this.state = jsonAddress.state;
    this.zip = jsonAddress.zip;

}

Address.prototype.update = function (street, street2, city, state, zip) {

    this.street = street   || this.street ;
    this.street2 = street2 || this.street2;
    this.city = city       || this.city;
    this.state = state     || this.state;
    this.zip = zip         || this.zip;

};

Address.prototype.toString = function () {

    return   this.street + ", " 
           + this.street2 + ", " 
           + this.city + ", "
           + this.state + " "
           + this.zip;

};