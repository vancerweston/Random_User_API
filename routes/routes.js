let myNames = require('../names .json');

let MAX_RESULTS = 5000;

exports.index = function (req, res) {
    res.send('Random User API');
}
exports.api = function (req, res) {
    this.results = req.query.results;
    this.seed = req.query.seed;
    res.send(generateNames(this.results, this.seed));
}

function generateNames(results, seed) {
    this.results = results;

    if (this.results > MAX_RESULTS) {
        this.results = MAX_RESULTS;
    }
    this.seed = seed;

    let rand = require('random-seed').create(this.seed);

    let gender;
    let picRand;
    let picNum;
    let genRand;
    let firstName, lastName, address, city, state, postalCode;

    let names = {
        "results": []
    }

    for (let i = 0; i < this.results; i++) {
        genRand = rand(2);
        picRand = rand(150) + 1;

        picNum = picRand;

        if (genRand == 0) {
            gender = 'male';
            picLarge = 'http://localhost:3000/images/large/m (' + picNum + ').jpg';
            picMedium = 'http://localhost:3000/images/medium/m (' + picNum + ').jpg';
            firstName = myNames.male_names[rand(myNames.male_names.length)];
        }
        else {
            gender = 'female';
            picLarge = 'http://localhost:3000/images/large/f (' + picNum + ').jpg';
            picMedium = 'http://localhost:3000/images/medium/f (' + picNum + ').jpg';
            firstName = myNames.female_names[rand(myNames.female_names.length)];
        }   
        lastName = myNames.last_names[rand(myNames.last_names.length)];

        address = myNames.last_names[rand(myNames.last_names.length)] + ' ' + myNames.street_types[rand(myNames.street_types.length)];
    
        city = myNames.last_names[rand(myNames.last_names.length)] + myNames.city_endings[rand(myNames.city_endings.length)];
    
        state = myNames.states[rand(myNames.states.length)];

        postalCode = Math.floor(Math.random()*90000) + 10000;
        
        email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@example.com';

        phone = (Math.floor(Math.random()*900) + 100) + '-' + (Math.floor(Math.random()*900) + 100) + '-' + (Math.floor(Math.random()*9000) + 1000);

        let start = new Date(1970, 0, 1);
        let end = new Date(2000, 0, 1);

        date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        function getAge(DOB) {
            let today = new Date();
            let birthDate = new Date(DOB);
            let age = today.getFullYear() - birthDate.getFullYear();
            return age;
        }

        age = getAge(date);
        
        let person = {
            "gender": gender,
            "name": {
                "first": firstName,
                "last": lastName
            },
            "location": {
                "street": address,
                "city": city,
                "state": state,
                "postalCode": postalCode
            },
            "email": email,
            "dob": {
                "date": date,
                "age": age
            },
            "phone": phone,
            "picture": {
                "large": picLarge,
                "medium": picMedium
            }
        }
        names.results.push(person);     
    }
    return names;
}

