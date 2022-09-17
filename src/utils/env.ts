export const getEnv = (key: string, defaultValue?: any): string => {
  return process.env[key] ?? defaultValue
}
