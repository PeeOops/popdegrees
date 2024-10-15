const formatDate = (dateString) => {
    const date = new Date(dateString);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'
    ]

    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}${getDaySuffix(day)} ${month} ${year}`;
}

export default formatDate;