import {flow} from 'lodash/fp'
import {gray, hex, bold} from 'chalk'
import {Project, TimeEntry} from '../../..'
import Current from '../../commands/current'
import {dateToTimeLabels, joinTimeLabels} from './time-label'
import {extractDateFromDuration} from '../../api/time-entry'
export const formatProjectName = (project?: Project) => project ? ' on ' + hex(project.hex_color)(project.name) : ''

export const formatTimeEntryDuration = flow(
  extractDateFromDuration,
  dateToTimeLabels,
  joinTimeLabels,
  gray
)

export const formatCurrentTimeEntry = ({timeEntry, project}: {timeEntry: TimeEntry; project?: Project}) => {
  const timeEntryDescription = timeEntry.description ? bold(timeEntry.description) + ' - '                       : Current.stdout.noTimeEntryDescription
  const timeEntryDuration = timeEntry.duration       ? formatTimeEntryDuration(timeEntry.duration) : Current.stdout.noTimeEntryDuration
  const projectName = project                        ? formatProjectName(project)                  : Current.stdout.noProject
  return `${timeEntryDescription}${timeEntryDuration}${projectName}`
}
