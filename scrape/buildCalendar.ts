import { writeFileSync } from "fs";
import isc from "ics";

const calendar = isc.createEvents([])
writeFileSync(`${__dirname}/event.ics`, calendar.value)
