import { Handler } from "@netlify/functions";
import { PersonService } from "./personservice";

const handler: Handler = async (event, context) => {
    const response = {
      headers: {"content-type": "application/json" },
      statusCode: 200,
      body: ''
    }
    // Removed /.netlify/functions/ in path
    const pathname = event.path.substring(19);
    if (pathname.includes("/person")) {
      if (pathname === "/person" || pathname === "/person/") {
        response.body = JSON.stringify(PersonService.getAllPersons())
        return response
      } else if (pathname.includes("/person/") ) {
        const personId = pathname.substring(8);
        const person = PersonService.getPersonForId(personId);
        if (!person) {
          response.statusCode = 404
          response.body = JSON.stringify({'error':`No person found for id: ${personId}`})
          return response
        } else {
          response.body = JSON.stringify(PersonService.getPersonForId(personId))
          return response
        }
      } 
    } 

    response.statusCode = 400
    response.body = `No api endpoint found for path ${pathname}`
    return response
};

export { handler };