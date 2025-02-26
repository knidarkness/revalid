type SecurityScheme = {
  type: 'http' | 'apiKey' | 'oauth2' | 'openIdConnect' | 'mutualTLS';
  description?: string;
  [key: string]: any;
};

export function generateInputsArazzoComponents(securitySchemes: Record<string, SecurityScheme>) {
  const inputs: Record<string, any> = {};

  for (const [name, scheme] of Object.entries(securitySchemes)) {
    if (scheme.type === 'http' || scheme.type === 'apiKey') {
      inputs[name] = {
        type: 'string',
        description: scheme?.description || `Authentication token for ${name}`,
        format: 'password'
      };
    }
  }

  return { inputs };
}
