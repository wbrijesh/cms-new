let myObject = [
  { name: "Client with all details", id: 23234 },
  { name: "abc", id: "2331234" },
];

var checkID = ["2331234"];

var matchedCategories = myObject.filter((i) => checkID.indexOf(i.id) >= 0);

let newobj = {
  name: "Client with all details",
  client_type: "Brand",
  country: "not ireland",
  website: "https://exampledomain.com",
  address: "bla bla bla",
  billing_contact_name: "kjbwdd wf",
  non_person_email: "non_person@email.com",
  billing_contact_email: "jane@doe.com",
  tax_id: "wkjej9er23",
  main_contact_name: "kjdw wefew",
  main_contact_email: "jane@doe.com",
  main_contact_phone: "3223428439",
  skype_or_gmeet: "kwjbfwl",
  sales_manager_email: "sales@manager.com",
  account_manager: "lkwe wef w",
  kickback_type: "Cost",
  kickback_value: "3",
  billing_entity: "eljv wef",
  id: "495359bb-ce95-4e4a-b7dc-dc352cd43cca",
  date_modified: "2021-06-08",
};

console.log(newobj["name"]);

// solution 1: take from thisCampaign.clientID and make a request using it to fetch the correct client
