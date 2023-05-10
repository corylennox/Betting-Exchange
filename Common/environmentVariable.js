export const getOptionalEnvironmentVariable = (environmentVariableName) => {
  return process.env[environmentVariableName];
};

export const getEnvironmentVariable = (environmentVariableName) => {
  const environmentVariable = getOptionalEnvironmentVariable(
    environmentVariableName
  );
  if (!environmentVariable) {
    console.error(`Missing environment variable ${environmentVariableName}`);
    process.exit(1);
  }
  return environmentVariable;
};
