#!/usr/bin/env python3

import os
from bs4 import BeautifulSoup

class Maker():

    def output_pages(self):
        sections = ["body", "face", "head"]
        for section in sections:
            parts = []
            parts.append(self.section_content(section))
            output = "\n".join(parts)
            with open(f"../../content/_wrappers/svgs-{section}.html", "w") as _out:
                _out.write(output)

    def section_content(self, section):
        output = []
        top_dir = f"svgs/{section}"
        for details in os.walk(top_dir):
            dir = details[0]
            for file in details[2]:
                input_path = f"{dir}/{file}"
                output.append(self.prep_content(input_path))
        return "\n".join(output)


    def prep_content(self, path):
        path_parts = path.split("/")
        name_parts = path_parts[2].split(".")
        with open(path) as _in:
            soup = BeautifulSoup("".join(_in.readlines()), 'xml')
            svg = soup.find("svg")
            svg["id"] = f"{path_parts[1]}-{name_parts[0]}"
            svg["data-part"] = path_parts[1]
            svg["data-option"] = name_parts[0]
            return svg.prettify()

if __name__ == "__main__":
    m = Maker()
    # print(m.section_content("body"))
    # print(m.prep_content("svgs/face/awe.svg"))
    # print(m.page())
    m.output_pages()

