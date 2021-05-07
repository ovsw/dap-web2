const refQueries = /* groq */ `
  _type == "sponsorsSection" => {
    sponsorsList[]->{
      ...
    }
  },
  _type == "faqSection" => {
    ...,
    faqItems[]{
      // if it's a heading item
      value != null => {
        "type": "heading",
        value
      },
      // if it's a ref to an FAQ item, grab that FAQ item by _ref
      _type == "reference" =>{
        "type": "faqItem",
        "faqItem": *[_type == 'faqItem' && _id == ^._ref][0],
      }
    }
  }
`;

export default refQueries;
