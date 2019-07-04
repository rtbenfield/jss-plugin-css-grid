declare module "css-vendor" {
  const prefix: {
    css: string;
    js: string;
  };

  function supportedProperty(prop: string): false | string;

  function supportedValue(prop: string, value: string): false | string;
}
