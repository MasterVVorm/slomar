export function permission(permissionTypes: Array<string>) {
  return function (target: any, key: string, propDesc: PropertyDescriptor) {
    const originalFunction = propDesc.value;

    return {
      value: function (_parent, _arguments, _context) {
        return originalFunction(_parent, _arguments, _context)
      },
    };
  };
}
