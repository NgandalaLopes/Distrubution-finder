export const getSavedCharityIds = () => {
    const savedCharityIds = localStorage.getItem('saved_charitys')
      ? JSON.parse(localStorage.getItem('saved_charitys'))
      : [];
  
    return savedCharityIds;
  };
  
  export const saveCharityIds = (charityIdArr) => {
    if (charityIdArr.length) {
      localStorage.setItem('saved_charitys', JSON.stringify(charityIdArr));
    } else {
      localStorage.removeItem('saved_charitys');
    }
  };
  
  export const unsaveCharityId = (charityId) => {
    const savedCharityIds = localStorage.getItem('saved_charitys')
      ? JSON.parse(localStorage.getItem('saved_charitys'))
      : null;
  
    if (!savedCharityIds) {
      return false;
    }
  
    const updatedSavedCharityIds = savedCharityIds?.filter((savedCharityId) => savedCharityId !== charityId);
    localStorage.setItem('saved_charitys', JSON.stringify(updatedSavedCharityIds));
  
    return true;
  };
  