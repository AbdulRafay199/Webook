import { createContext, useState } from "react";
const postcontext = createContext();

const Poststate = (props)=>{
  const locations = [
    "Andorra",
"United Arab Emirates",
"Afghanistan",
"Antigua and Barbuda",
"Anguilla",
"Albania",
"Armenia",
"Netherlands Antilles",
"Angola",
"Antarctica",
"Argentina",
"American Samoa",
"Austria",
"Australia",
"Aruba",
"Aland Islands",
"Azerbaijan",
"Bosnia and Herzegovina",
"Barbados",
"Bangladesh",
"Belgium",
"Burkina Faso",
"Bulgaria",
"Bahrain",
"Burundi",
"Benin",
"Saint Barthelemy",
"Bermuda",
"Brunei",
"Bolivia",
"Bonaire, Saint Eustatius and Saba ",
"Brazil",
"Bahamas",
"Bhutan",
"Bouvet Island",
"Botswana",
"Belarus",
"Belize",
"Canada",
"Cocos Islands",
"Democratic Republic of the Congo",
"Central African Republic",
"Republic of the Congo",
"Switzerland",
"Ivory Coast",
"Cook Islands",
"Chile",
"Cameroon",
"China",
"Colombia",
"Costa Rica",
"Serbia and Montenegro",
"Cuba",
"Cape Verde",
"Curacao",
"Christmas Island",
"Cyprus",
"Czechia",
"Germany",
"Djibouti",
"Denmark",
"Dominica",
"Dominican Republic",
"Algeria",
"Ecuador",
"Estonia",
"Egypt",
"Western Sahara",
"Eritrea",
"Spain",
"Ethiopia",
"Finland",
"Fiji",
"Falkland Islands",
"Micronesia",
"Faroe Islands",
"France",
"Gabon",
"United Kingdom",
"Grenada",
"Georgia",
"French Guiana",
"Guernsey",
"Ghana",
"Gibraltar",
"Greenland",
"Gambia",
"Guinea",
"Guadeloupe",
"Equatorial Guinea",
"Greece",
"South Georgia and the South Sandwich Islands",
"Guatemala",
"Guam",
"Guinea-Bissau",
"Guyana",
"Hong Kong",
"Heard Island and McDonald Islands",
"Honduras",
"Croatia",
"Haiti",
"Hungary",
"Indonesia",
"Ireland",
"Israel",
"Isle of Man",
"India",
"British Indian Ocean Territory",
"Iraq",
"Iran",
"Iceland",
"Italy",
"Jersey",
"Jamaica",
"Jordan",
"Japan",
"Kenya",
"Kyrgyzstan",
"Cambodia",
"Kiribati",
"Comoros",
"Saint Kitts and Nevis",
"North Korea",
"South Korea",
"Kuwait",
"Cayman Islands",
"Kazakhstan",
"Laos",
"Lebanon",
"Saint Lucia",
"Liechtenstein",
"Sri Lanka",
"Liberia",
"Lesotho",
"Lithuania",
"Luxembourg",
"Latvia",
"Libya",
"Morocco",
"Monaco",
"Moldova",
"Montenegro",
"Saint Martin",
"Madagascar",
"Marshall Islands",
"Macedonia",
"Mali",
"Myanmar",
"Mongolia",
"Macao",
"Northern Mariana Islands",
"Martinique",
"Mauritania",
"Montserrat",
"Malta",
"Mauritius",
"Maldives",
"Malawi",
"Mexico",
"Malaysia",
"Mozambique",
"Namibia",
"New Caledonia",
"Niger",
"Norfolk Island",
"Nigeria",
"Nicaragua",
"Netherlands",
"Norway",
"Nepal",
"Nauru",
"Niue",
"New Zealand",
"Oman",
"Panama",
"Peru",
"French Polynesia",
"Papua New Guinea",
"Philippines",
"Pakistan",
"Poland",
"Saint Pierre and Miquelon",
"Pitcairn",
"Puerto Rico",
"Palestinian Territory",
"Portugal",
"Palau",
"Paraguay",
"Qatar"
,"Reunion"
,"Romania",
"Serbia",
"Russia",
"Rwanda",
"Saudi Arabia",
"Solomon Islands",
"Seychelles",
"Sudan",
"Sweden",
"Singapore",
"Saint Helena",
"Slovenia",
"Svalbard and Jan Mayen",
"Slovakia",
"Sierra Leone",
"San Marino",
"Senegal",
"Somalia",
"Suriname",
"South Sudan",
"Sao Tome and Principe",
"El Salvador",
"Sint Maarten",
"Syria",
"Swaziland",
"Turks and Caicos Islands",
"Chad",
"French Southern Territories",
"Togo",
"Thailand",
"Tajikistan",
"Tokelau",
"Timor Leste",
"Turkmenistan",
"Tunisia",
"Tonga",
"Turkey",
"Trinidad and Tobago",
"Tuvalu",
"Taiwan",
"Tanzania",
"Ukraine",
"Uganda",
"United States Minor Outlying Islands",
"United States",
"Uruguay",
"Uzbekistan",
"Vatican",
"Saint Vincent and the Grenadines",
"Venezuela",
"British Virgin Islands",
"U.S. Virgin Islands",
"Vietnam",
"Vanuatu",
"Wallis and Futuna",
"Samoa",
"Kosovo",
"Yemen",
"Mayotte",
"South Africa",
"Zambia",
"Zimbabwe",
  ]
    const initposts = []
    const [posts,setposts] = useState(initposts)

    const fetchallpost = async ()=>{

      const url = "http://localhost:5000/post/getallpost";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      setposts(json)
      
    }

    const addpost = async (post)=>{

      const url = "http://localhost:5000/post/addpost";

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authtoken")
        },
        body: JSON.stringify(post)
        // caption: post.caption,loc: post.loc !== "" ? post.loc : "none"
      });
      const json = await response.json();
      console.log(json)
      
    }
    const dltpost = async (postid)=>{

      const url = `http://localhost:5000/post/deletepost/${postid}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authtoken")
        },
      });
      const json = await response.json();
      console.log(json)
      
    }
    
    let [indpost,setindpost] = useState([])
    indpost = indpost.filter((each)=>{return each.shareduserid === "none"})
    let pathname =  window.location.pathname;
    pathname = pathname.split("/")
    const addindpost = async (postid)=>{

      if(pathname[2]){
        const url = `http://localhost:5000/post/getindpost/${pathname[2]}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        setindpost(json)
      }
      else{
        const url = `http://localhost:5000/post/getindpost/${postid}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        setindpost(json)
      }
    }
    

    return(
        <postcontext.Provider value={{posts,setposts,fetchallpost,addpost,dltpost,locations,indpost,addindpost}}>
            {props.children}
        </postcontext.Provider>
    )
}

export default Poststate;
export {postcontext};