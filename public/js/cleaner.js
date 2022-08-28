function dataCleaner(userInput) {
  return DOMPurify.sanitize(userInput);
}
