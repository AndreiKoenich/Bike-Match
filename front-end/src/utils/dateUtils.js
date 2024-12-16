import moment from 'moment';

export const currentDate = () => {
    var data = new Date(),
    day  = data.getDate().toString().padStart(2, '0'),
    month  = (data.getMonth()+1).toString().padStart(2, '0'),
    year  = data.getFullYear();
    return day+"/"+month+"/"+year;   
}

export const formattedDate = (date) => {
    const realDate = new Date (date);
    const day = String(realDate.getDate()).padStart(2, '0');  
    const month = String(realDate.getMonth() + 1).padStart(2, '0');  
    const year = realDate.getFullYear();
    const hours = String(realDate.getHours()).padStart(2, '0');
    const minutes = String(realDate.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const calculateRentalDates = (inputDate, days) => {
    const startDate = moment(inputDate, 'YYYY-MM-DD').toISOString();
    const endDate = moment().add(days, 'days').toISOString();

    return {
        startDate,
        endDate,
    };
};

  