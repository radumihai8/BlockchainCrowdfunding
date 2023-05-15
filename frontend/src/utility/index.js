export const progressPercentage = (current, goal) => {
    return Math.round((100 * current) / goal);
};

export const timeLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const daysLeft = difference / (24 * 3600 * 1000);
    return daysLeft.toFixed(0);
  };
  
export const verifyImg = (url, callback) => {
    const image = new Image();
    image.src = url;
    if (image.complete) 
    {
        callback(true);
    }
  
    image.onload = () => callback(true);
    image.onerror = () => callback(false);
};