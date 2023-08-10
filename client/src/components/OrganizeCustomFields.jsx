const OrganizeCustomFields = (customFieldsData) => {
  const organizedFields = [];

  customFieldsData.forEach((field) => {
    const { _id, groupname, section, label, type } = field;

    const groupIndex = organizedFields.findIndex(
      (g) => g.groupname === groupname
    );

    if (groupIndex === -1) {
      organizedFields.push({
        groupname,
        sections: [
          {
            section,
            fields: [{ _id, label, type }],
          },
        ],
      });
    } else {
      const sectionIndex = organizedFields[groupIndex].sections.findIndex(
        (s) => s.section === section
      );

      if (sectionIndex === -1) {
        organizedFields[groupIndex].sections.push({
          section,
          fields: [{ _id, label, type }],
        });
      } else {
        organizedFields[groupIndex].sections[sectionIndex].fields.push({
          _id,
          label,
          type,
        });
      }
    }
  });

  return organizedFields;
};

export default OrganizeCustomFields;
