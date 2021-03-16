import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import { gapi } from "gapi-script";

const { Option } = Select;

function App() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const {numNeedles, outreachDate} = values;
    const formattedOutreachDate = outreachDate.format("MM/DD/YYYY");

    console.log(numNeedles, formattedOutreachDate);

    const submitValues = [numNeedles, formattedOutreachDate];

    const params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: REACT_APP_SPREADSHEET_ID,
      // The A1 notation of a range to search for a logical table of data.Values will be appended after the last row of the table.
      range: 'Sheet1', //this is the default spreadsheet name, so unless you've changed it, or are submitting to multiple sheets, you can leave this
      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED', //RAW = if no conversion or formatting of submitted data is needed. Otherwise USER_ENTERED
      // How the input data should be inserted.
      insertDataOption: 'INSERT_ROWS', //Choose OVERWRITE OR INSERT_ROWS
    };

    const valueRangeBody = {
      'majorDimension': 'ROWS', //log each entry as a new row (vs column)
      'values': [submitValues] //convert the object's values to an array
    };

    let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function (response) {
      // TODO: Insert desired response behaviour on submission
      console.log(response.result);
    }, function (reason) {
      console.error('error: ' + reason.result.error.message);
    });

  };

  const handleClientLoad =()=> { //initialize the Google API
    gapi.load('client:auth2', initClient);
  }

  const updateSignInStatus = (isSignedIn) => {
    console.log('------');
    console.log(isSignedIn);
    console.log('hi');
  };

  const initClient =()=> { //provide the authentication credentials you set up in the Google developer console
    gapi.client.init({
      'apiKey': REACT_APP_API_KEY,
      'clientId': REACT_APP_CLIENT_ID,
      'scope': REACT_APP_SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(()=> {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus); //add a function called `updateSignInStatus` if you want to do something once a user is logged in with Google
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      gapi.auth2.getAuthInstance().signIn();
    });
  }

  useEffect(() => {
    handleClientLoad();
  }, []);

  return (
    <Form form={form}onFinish={onFinish}>
      <Form.Item
        name="outreachDate"
        label="date of outreach"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker required format="MM/DD/YYYY" />
      </Form.Item>

      <Form.Item name="numNeedles" label="number of needles"
      rules={[
        {
          required: true,
        },
      ]} >
      <InputNumber required placeholder="number of needles" />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default App;
