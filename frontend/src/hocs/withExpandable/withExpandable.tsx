/**
 * @license
 * Copyright 2018-2020 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ComponentType, ReactElement, useEffect, useState } from "react"
import { styled } from "styletron-react"
import { colors, variables } from "lib/widgetTheme"

export interface Props {
  expandable: boolean
  label: string
  expanded: boolean
}

type ComponentProps = {
  expanded: boolean
}

export const AnimatedComponentWrapper = styled(
  "div",
  ({ expanded }: ComponentProps) => ({
    maxHeight: expanded ? "100vh" : 0,
    overflow: "hidden",
    transitionProperty: "max-height",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease-in-out",
  })
)

export const StyledHeader = styled("div", ({ expanded }: ComponentProps) => ({
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  borderWidth: 0,
  borderBottomWidth: expanded ? "1px" : 0,
  borderStyle: "solid",
  borderColor: colors.grayLighter,
  marginBottom: variables.spacer,
  transitionProperty: "border-bottom-width",
  transitionDuration: "0.5s",
  transitionTimingFunction: "ease-in-out",
}))

export const StyledToggle = styled("small", {
  color: colors.gray,
})

function withExpandable(
  WrappedComponent: ComponentType<any>
): ComponentType<any> {
  const ExpandableComponent = (props: Props): ReactElement => {
    const { label, expanded: initialExpanded, ...componentProps } = props

    const [expanded, toggleExpanded] = useState<boolean>(initialExpanded)
    useEffect(() => {
      toggleExpanded(initialExpanded)
    }, [initialExpanded])

    const toggle = (): void => toggleExpanded(!expanded)

    return (
      <>
        <StyledHeader expanded={expanded}>
          <div>{label}</div>
          <StyledToggle onClick={toggle} role="button" data-toggle>
            {expanded ? "Hide" : "Show"}
          </StyledToggle>
        </StyledHeader>
        <AnimatedComponentWrapper expanded={expanded}>
          <WrappedComponent {...componentProps} />
        </AnimatedComponentWrapper>
      </>
    )
  }

  return ExpandableComponent
}

export default withExpandable
