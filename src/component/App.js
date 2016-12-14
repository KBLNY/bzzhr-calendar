import React, { Component } from 'react';
import logo from '../assets/img/logo.svg';
import './App.css';
import EventApiManager from "../api/EventApiManager.js";
import BigCalendar from 'react-big-calendar';
import { DatePicker, DateField, TransitionView } from 'react-date-picker';
import moment from 'moment';

// Import CSS
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-date-picker/index.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


class App extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      events: [], // Events that will be shown is the calendar
      startDate: "", // Start date filter
      endDate : "" // End Date Filter
    };
  }


  componentDidMount() {
    // When the component is mounted, get all events without filter
    this.loadAllEvents();
  }


  /* Data Source */

  /**
   * Load all events, and display the result in the calendar  
   */
  loadAllEvents() {
    // By default enable overlaping
    EventApiManager.getAllEvents(this.state.startDate, this.state.endDate, true).then(events => {
      // Set the component's state with the new events. (This will re-render the component with the new data)
      this.setState({events : events});
    })
    .catch(error => {
      // In case of error, log a message in the console
      console.error(error);
    })
  }


  /**
   * Handle Date Picker Change
   */
  datePickerStartOnChange(dateString, { dateMoment, timestamp }) {
    this.setState({
      startDate : dateString
    });
  }

  datePickerEndOnChange(dateString, { dateMoment, timestamp }) {
    this.setState({
      endDate : dateString
    });
  }


  /* Filtering */

  onFilterClear() {
    // Reset the filters' state
    this.setState({
      startDate: "",
      endDate: ""
    });

    // And load all events without Filtering
    this.loadAllEvents();
  }

  onFilterApply() {
    // On filter apply, execute API call
    this.loadAllEvents();
  }
  

  /* Rendering */

  render() {
    const { events } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Event Calendar</h2>
        </div>

        <div className="App-filters">
          Set Start Date/Time Filter: 
          <DateField
            forceValidDate
            dateFormat="YYYY-MM-DDTHH:mm:ss"
            updateOnDateClick={true} >
            <TransitionView>
              <DatePicker
                navigation={true}
                locale="en"
                forceValidDate={false}
                highlightWeekends={true}
                highlightToday={true}
                weekNumbers={false}
                weekStartDay={0}
                onChange={this.datePickerStartOnChange.bind(this)}
              />
            </TransitionView>
          </DateField>
          
          Set End Date/Time Filter: 
          <DateField
            forceValidDate
            dateFormat="YYYY-MM-DDTHH:mm:ss"
            updateOnDateClick={true} >
            <TransitionView>
              <DatePicker
                navigation={true}
                locale="en"
                forceValidDate={false}
                highlightWeekends={true}
                highlightToday={true}
                weekNumbers={false}
                weekStartDay={0}
                onChange={this.datePickerEndOnChange.bind(this)}
              />
            </TransitionView>
          </DateField>

          <button type="button" onClick={this.onFilterClear.bind(this)}>Clear Filters</button>
          <button type="submit" onClick={this.onFilterApply.bind(this)}>Apply Filters</button>
        </div>

        {
          /**
           * This is where the magic happen!
           * @param events This is used as data source, each time a this.setState is performed, the state of this component is changed, and then a render is occured. This is automatically done by React.js
           * @param timeslots The number of slots per hours "section" in the Time grid views.
           * @param defaultView This is the default view of the calendar, here week 
           */
        }
        <BigCalendar
          events={events}
          timeslots={4}
          defaultView='week'
        />
      </div>
    );
  }
}

export default App;
