// this is the official solution by Flatiron School

/*

createEmployeeRecord
        ✓ populates a firstName field from the 0th element
        ✓ populates a familyName field from the 1th element
        ✓ populates a title field from the 2th element
        ✓ populates a payPerHour field from the 3th element
        ✓ initializes a field, timeInEvents, to hold an empty Array
        ✓ initializes a field, timeOutEvents, to hold an empty Array


*/
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// process an Array of Arrays into an Array of employee records
//       ✓ has a function called createEmployeeRecords
//       createEmployeeRecords
//         ✓ creates two records
//         ✓ correctly assigns the first names
//         ✓ creates more than 2 records


let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//       ✓ has a function called createTimeInEvent
//       createTimeInEvent
//         ✓ creates the correct type
//         ✓ extracts the correct date
//         ✓ extracts the correct hour


let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}


// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
// ✓ has a function called createTimeOutEvent
// createTimeOutEvent
//   ✓ creates the correct type
//   ✓ extracts the correct date
//   ✓ extracts the correct hour

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//       ✓ hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//       hoursWorkedOnDate
//         ✓ calculates that the employee worked 2 hours

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// ✓ wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// wagesEarnedOnDate
//   ✓ calculates that the employee earned 54 dollars

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// ✓ wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// wagesEarnedOnDate
//   ✓ calculates that the employee earned 54 dollars

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

// Given an array of multiple employees
//       ✓ calculatePayroll aggregates all the dates' wages and adds them together
//       calculatePayroll
//         ✓ calculates that the employees earned 770 dollars
//     runs payroll using the mock data provided by Ultron data systems
//       Dependent functions: createEmployeeRecords
//         takes CSV data, returns an array of employee records
//           ✓ exists
//           ✓ returns an Array with 2 records for Loki and Natalia
//       Full Payroll Test
//         from several imported CSV structures
//           calculatePayroll
//             ✓ exists
//             ✓ correctly sums the payroll burden to $11,880 when passed an array of employee records


let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}