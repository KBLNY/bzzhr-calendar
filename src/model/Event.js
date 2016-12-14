import moment from "moment";

/**
 * This Model represents an event used in the Calendar by the App
 * It is defined by an event Start Date, an event End Date, labelized by a title and refered to a Category 
 */
export default class Event {

    /**
     * Constructor of the `Event`, instanciate a new Event
     * @param {string} start The start date of the event
     * @param {string} end The end date of the event
     * @param {string} label The description of the event
     * @param {string} category The category of the event
     */    
    constructor(start, end, label, category) {
        this.start = moment(start, "YYYY-DD-MMTHH:mm:ssZ").toDate();
        this.end = moment(end, "YYYY-DD-MMTHH:mm:ssZ").toDate();
        this.title = label;
        this.category = category;
    }


    /**
     * Get a new `Event` from a JSON
     * @param {JSON} json A JSON object having the properties to instantiate a new `Event`
     * @return {Event} a new instance of Event with the properties of the JSON object
     * @throws {Error} throw an `Error` if not all the properties are provided
     */
    static fromJson(json: JSON) {
        // If the JSON contains all the required properties, return a new event
        // Otherwise throw an Error
        if (json.start 
            && json.end
            && json.label
            && json.category) {
            return new Event(json.start, json.end, json.label, json.category);
        } else {
            throw new Error("Please provide a valid JSON, containing `start`, `end`, `label` and `category` properties.")
        }
    } 

}