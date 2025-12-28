export const BRV_PULL_TEMPLATE = `
# Byterover Pull

## Overview
Updates the context-tree based on the pulling from the remote.

## Instructions
Run the command "brv pull" to pull the current context-tree, follow the following instructions:
1. Use expect to run the interactive terminal, follow this guide
    """
    spawn brv

    expect "Activity"
    send -- "\t"

    expect "Use"
    send -- "/pull\r"

    expect eof

    puts "Pushing Done"
    """
`;

export const BRV_PUSH_TEMPLATE = `
# Byterover Push

## Overview
Pushes the updates context-tree to brv storage.

## Instructions
1. Run the following agent commands in the chat:
    - /.brv/context-tree/bug_fixes/context 
    - /.brv/context-tree/code_style/context 
    - /.brv/context-tree/compliance/context 
    - /.brv/context-tree/design/context 
    - /.brv/context-tree/README 
    - /.brv/context-tree/structure/context 
    - /.brv/context-tree/testing/context 
2. Now use "brv push" to push the context-tree as we want, follow this guide to execute the command:
    """
    spawn brv

    expect "Activity"
    send -- "\t"

    expect "Use"
    send -- "/push\r"

    expect eof

    puts "Pushing Done"
    """

`;

