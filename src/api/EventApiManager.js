// Import
import _ from "lodash";
import Event from '../model/Event.js';
import * as HttpService from "./HttpService";

/**
 * This API Manager is used to perform HTTP calls regarding the Event API
 */
export default class EventApiManager {

    /**
     * Get All Events without filtering
     * @return {Promise} Return a Promise with an array of `Event`s
     */
    static getAllEvents(start = "", end = "", overlaps = false) {
        // build the URL to call
        let url = "https://assessments.bzzhr.net/calendar?";
        url += `since=${start}`;
        url += `&before=${end}`;
        url += `&overlaps=${overlaps}`;

        // Perform HTTP Call and return the promise
        return HttpService.doGet(url).then(events => {
            // For each item in the JSON, instanciate a new Event model
            // Return an array of Event
            return _.map(events, e => Event.fromJson(e));
        });
    }

}
