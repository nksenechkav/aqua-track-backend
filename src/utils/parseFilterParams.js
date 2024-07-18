// src/utils/parseFilterParams.js

const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if (isContactType(contactType)) return contactType;
  };

  const parseisFavourite = (isFavourite) => {
    if (!(typeof isFavourite === 'boolean')) return isFavourite;
  };

  export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedisFavourite = parseisFavourite(isFavourite);

    return {
      contactType: parsedContactType,
      isFavourite: parsedisFavourite,
    };
  };
