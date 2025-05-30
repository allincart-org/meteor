type IconDimensions = {
  width: string;
  height: string;
};

export class CSSFile {
  private icons = new Map<string, IconDimensions>();

  addIcon(name: string, dimensions: IconDimensions) {
    this.icons.set(name, dimensions);
  }

  toString() {
    const hasNoIcons = this.icons.size === 0;
    if (hasNoIcons) {
      return `/* This file is auto-generated by meteor-icon-kit. */`;
    }

    const iconsAsArray = Array.from(this.icons).sort(([a], [b]) => {
      return a.localeCompare(b);
    });

    const css = iconsAsArray.reduce(
      (accumulator, [iconName, iconDimensions]) => {
        const foo = `#meteor-icon-kit__${iconName} {
  width: ${iconDimensions.width};
  height: ${iconDimensions.height};
}`;
        return `${accumulator}\n\n${foo}`;
      },
      ""
    );

    return `/* This file is auto-generated by meteor-icon-kit. */${css}`;
  }
}
