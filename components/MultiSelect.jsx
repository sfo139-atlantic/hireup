import React, { useState, useEffect } from 'react';

import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';


const options = {
  skills: [
    { value: 'others', label: 'Others'},
    { value: 'web development', label: 'Web Development'},
    { value: 'front end development', label: 'Front End Development'},
    { value: 'back end development', label: 'Back End Development'},
    { value: 'full stack development', label: 'Full Stack Development'},
    { value: 'testing', label: 'QA / Testing Engineer'},
    { value: 'devops', label: 'DevOps Engineer'},
    { value: 'security', label: 'Security Engineer'},
    { value: 'ui designer', label: 'UI Designer'},
    { value: 'ux designer', label: 'UX Designer'},
    { value: 'product designer', label: 'Product Designer'},
    { value: 'product manager', label: 'Product Manager'},
    { value: 'monday.com', label: 'Monday.com'},
    { value: 'jira', label: 'Jira'},
    { value: 'asana', label: 'Asana'},
    { value: 'clickup', label: 'ClickUp'},
    { value: 'react', label: 'React'},
    { value: 'figma', label: 'Figma'},
    { value: 'scrum', label: 'SCRUM'},
    { value: 'python', label: 'Python'},
    { value: 'javascript', label: 'JavaScript'},
    { value: 'java', label: 'Java'},
    { value: 'c#', label: 'C#'},
    { value: 'c', label: 'C'},
    { value: 'c++', label: 'C++'},
    { value: 'go', label: 'GO'},
    { value: 'r', label: 'R'},
    { value: 'swift', label: 'Swift'},
    { value: 'php', label: 'PHP'},
    { value: 'asp.net', label: 'ASP.NET'},
    { value: 'vue.js', label: 'Vue.js'},
    { value: 'express', label: 'Express'},
    { value: 'gatsby', label: 'Gatsby'},
    { value: 'spring', label: 'Spring'},
    { value: 'django', label: 'Django'},
    { value: 'flask', label: 'Flask'},
    { value: 'angular', label: 'Express'},
    { value: 'laravel', label: 'Laravel'},
    { value: 'ruby on rails', label: 'Ruby on Rails'},
    { value: 'symfony', label: 'Symfony'},
    { value: 'jquery', label: 'jQuery'},
    { value: 'drupal', label: 'Drupal'},
    { value: 'angular.js', label: 'Angular.js'},
    { value: 'node.js', label: 'Node.js'},
    { value: 'mongodb', label: 'MongoDB'},
    { value: 'mysql', label: 'MySQL'},
    { value: 'linux', label: 'Linux'},
    { value: 'apache', label: 'Apache'},
    { value: 'nginx', label: 'Nginx'},
    { value: 'docker', label: 'Docker'},
    { value: 'html', label: 'HTML'},
    { value: 'css', label: 'CSS'},
    { value: 'react native', label: 'React Native'},
    { value: 'flutter', label: 'Flutter'},
    { value: 'ionic', label: 'Ionic'},
    { value: 'bootstrap', label: 'BootStrap'},
    { value: 'golang', label: 'Golang'},
    { value: 'pearl', label: 'Pearl'},
    { value: 'kotlin', label: 'Kotlin'},
    { value: 'aws', label: 'AWS'},
    { value: 'sketch', label: 'Sketch'},
    { value: 'invision', label: 'InVision'},
    { value: 'axure', label: 'Axure'},
    { value: 'adobe xd', label: 'Adobe XD'},
    { value: 'marvel', label: 'Marvel'},
    { value: 'framer x', label: 'Framer X'},
    { value: 'webflow', label: 'Webflow'},
  ],
  timezones: [
    { value: 'Pacific', label: 'Pacific'},
    { value: 'Mountain', label: 'Mountain'},
    { value: 'Central', label: 'Central'},
    { value: 'Eastern', label: 'Eastern'},
  ],
  portfolio: []
}

export default function CreatableMulti(props) {
  const handleChange = (value) => {
    props.handleChange(props.type, value.map(obj => obj.label))
  }

  if (props.selected) {
    return (
      <CreatableSelect
      key={props.id}
      isMulti
      options={options[props.type]}
      onChange={(value) => handleChange(value)}
      defaultValue={props.selected.length === 0 ? null : props.selected.map(select => {
        const selectObj = {}
        selectObj.value = select
        selectObj.label = select
        return selectObj
      })}
    />
    )
  } else {
    return (
      <CreatableSelect
      key={props.id}
      isMulti
      options={options[props.type]}
      onChange={(value) => handleChange(value)}
    />
    )
  }
}