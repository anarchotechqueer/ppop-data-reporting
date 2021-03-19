export const dateFormat = "MM/DD/YYYY";

export const forms = [
  {
    id: 1,
    name: 'Outreach form',
    sections: [{
      id: 1,
      name: 'General Info',
      questions: [{
        id: 1,
        label: 'Date of outreach',
        placeholder : 'Date of outreach',
        name: 'outreachDate',
        required: true,
        type: 'date'
      }, {
        id: 2,
        label: 'Type of outreach',
        placeholder : 'Type of outreach',
        name: 'outreachType',
        required: true,
        type: 'select',
        options: [{
          id: 1,
          label: 'Fixed Site',
          value: 'Fixed Site',
        }, {
          id: 2,
          label: 'Mobile Foot',
          value: 'Mobile Foot',
        }, {
          id: 3,
          label: 'Mobile Bicyle',
          value: 'Mobile Bicyle',
        }, {
          id: 4,
          label: 'Individual/Co-Op Outreach',
          value: 'Individual/Co-Op Outreach',
        }, ]
      },]
    }, {
      id: 2,
      name: 'Syringes',
      questions: [{
        id: 1,
        label: 'Total # of Syringes',
        placeholder : 'Total # of Syringes',
        name: 'numNeedles',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 2,
        label: 'Total # of People Who Got Syringes',
        placeholder : 'Total # of People Who Got Syringes',
        name: 'numPeopleReceivedSyringes',
        required: true,
        type: 'number',
        min: 0,
      }, ]
    }, {
      id: 3,
      name: 'Nalaxone',
      questions: [{
        id: 1,
        label: 'Total # of Naloxone',
        placeholder : 'Total # of Naloxone',
        name: 'numNaloxone',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 2,
        label: 'Total # of Used Naloxone',
        placeholder : 'Total # of Used Naloxone',
        name: 'numUsedNaloxone',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 3,
        label: 'Total # of Most Recently Used Naloxone That Came from PPOP',
        placeholder : 'Total # of Most Recently Used Naloxone That Came from PPOP',
        name: 'numUsedNaloxoneFromPPOP',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 4,
        label: 'Total # of People Who Lived',
        placeholder : 'Total # of People Who Lived',
        name: 'numPeopleLived',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 5,
        label: 'Total # of Times that the Most Recently Used Naloxone that Came from PPOP Resulted in Survival',
        placeholder : 'Total # of Times that the Most Recently Used Naloxone that Came from PPOP Resulted in Survival',
        name: 'numLivedFromPPOP',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 6,
        label: 'Total # of People Trained to Use Naloxone',
        placeholder : 'Total # of People Trained to Use Naloxone',
        name: 'numNaloxoneTrainings',
        required: true,
        type: 'number',
        min: 0,
      }, ]
    }, {
      id: 4,
      name: 'Meth pipes',
      questions: [{
        id: 1,
        label: 'Total # of Meth Pipes',
        placeholder : 'Total # of Meth Pipes',
        name: 'numMethPipes',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 1,
        label: 'Total # of People Who Were Turned Down for a Meth Pipe',
        placeholder : 'Total # of People Who Were Turned Down for a Meth Pipe',
        name: 'numPeopleTurnedDownMethPipes',
        required: true,
        type: 'number',
        min: 0,
      }, ]
    }, {
      id: 5,
      name: 'Other',
      questions: [{
        id: 1,
        label: 'Total # of Snorting Kits Distributed',
        placeholder : 'Total # of Snorting Kits Distributed',
        name: 'numWoundCare',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 2,
        label: 'Total # of Wound Care Kits Distributed',
        placeholder : 'Total # of Wound Care Kits Distributed',
        name: 'numWoundCare',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 2,
        label: 'Total # of People',
        placeholder : 'Total # of People',
        name: 'numPeople',
        required: true,
        type: 'number',
        min: 0,
      }, {
        id: 4,
        label: 'Total # of Police',
        placeholder : 'Total # of Police',
        name: 'numPolice',
        required: true,
        type: 'number',
        min: 0,
      }, ]
    }]
  }
];
