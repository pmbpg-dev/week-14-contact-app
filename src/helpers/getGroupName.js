export const getGroupName = (groups, id) => {
  const check = (member) => member === id;
  const selectedGroups = groups.filter((g) => g.members.some(check));
  return selectedGroups;
};
