function sortImportableContacts(contacts) {
  return [...contacts].sort((a, b) => {
    const getPriority = (contact) => {
      if (contact.user && !contact.isAlreadySaved) return 1;
      return 2;
    };

    const priorityA = getPriority(a);
    const priorityB = getPriority(b);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return (a.name || '').localeCompare(b.name || '', undefined, {
      sensitivity: 'base',
    });
  });
}

export function buildImportableContacts({
  contacts,
  registeredUsers,
  savedContactIds,
  currentUserId,
}) {
  const importableContacts = [];

  for (const contact of contacts) {
    const user = registeredUsers[contact.email];
    const isCurrentUser = user && user.uid === currentUserId;
    const isAlreadySaved = user && savedContactIds.has(user.uid);

    if (!isCurrentUser) {
      importableContacts.push({
        ...contact,
        user,
        isAlreadySaved,
      });
    }
  }

  return sortImportableContacts(importableContacts);
}

export function filterImportableContacts(contacts, rawQuery) {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return contacts;
  }

  return contacts.filter((contact) => {
    const nameMatch = (contact.name || '').toLowerCase().includes(query);
    const emailMatch = (contact.email || '').toLowerCase().includes(query);
    return nameMatch || emailMatch;
  });
}
