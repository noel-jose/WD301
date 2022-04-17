import React from "react";

export type textFieldTypes = "text" | "email" | "date" | "number";

type TextField = {
  id: number;
  kind: "text";
  label: string;
  fieldType: textFieldTypes;
  value: string;
};

type DropDownField = {
  kind: "dropdown";
  id: number;
  label: string;
  options: string[];
  value: string;
};

type MultiSelect = {
  kind: "multiselect";
  id: number;
  label: string;
  options: string[];
  value: string;
};

type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
};

type TextArea = {
  kind: "textarea";
  id: number;
  label: string;
  value: string;
};

export type formFieldType =
  | "text"
  | "dropdown"
  | "textarea"
  | "radio"
  | "multiselect";

export type formField =
  | TextField
  | DropDownField
  | TextArea
  | RadioField
  | MultiSelect;
