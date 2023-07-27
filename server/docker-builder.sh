#! /bin/bash
# NOTE: this script need to be running in the correct docker context

getopts ":y" ops

permission_all_yes=""
default_permission="y"
permission=$default_permission

if [ "$ops" == "y" ]; then permission_all_yes="y"; fi

ask_permission() {
    if [ "$permission_all_yes" ]; then
        permission="y"
        return
    fi

    # get permmission string as agrument
    local permission_string=$1
    local default_permission_local=$2
    local default_y="[Y/n]"
    local default_n="[y/N]"
    local default_selected=""

    if [[ "$default_permission_local" != "n" && "$default_permission_local" != "y" ]]; then
        default_permission_local=$default_permission
    fi

    # settings default selection indicatior dialog propt string
    if [ "$default_permission_local" == "y" ]; then default_selected=$default_y; else default_selected=$default_n; fi

    # getting permission from user
    read -p "> $permission_string $default_selected : " permission

    # if there is noting then sets to default permission
    if [ "$permission" == "" ]; then permission=$default_permission_local; fi

    # set permission curresponding to user input
    if [[ "$permission" == "y" || "$permission" == "yes" ]]; then
        permission="y"
    else
        permission=""
    fi
}

container_name="job-apply-bot-backend"
image_name="job-apply-bot-backend"
container_id="$(docker ps -a | grep "$container_name" | cut -d ' ' -f 1)"

create_docker_image() {
    echo "> Creating new image..."
    docker build -t "$image_name" .
}

run_docker_container() {
    echo "> Running new container..."
    docker run  --name "$container_name" "$image_name"
}

if [ "$container_id" ]; then
    ask_permission "Do you want to remove existing container (this will help removing unwanted refrence while removing the image)"
    if [ "$permission" ]; then
        echo "> Stoping existing container..."
        docker stop "$container_name"
        echo "> Removing existing container..."
        docker rm "$container_name"
    fi
fi

if [ "$(docker images -a | grep "job-apply-bot-backend" | cut -d ' ' -f 1)" ]; then
    ask_permission "Existing image found do you want to remove and re-create it"
    if [ "$permission" ]; then
        # removing running containers
        echo "> removing existing image..."
        docker rmi "$image_name"
        create_docker_image
    fi
else
    echo "> No image found"
    create_docker_image
fi

ask_permission "Do you want to create and run a container"
if [ "$permission" ]; then
    if [ "$container_id" ]; then
        ask_permission "Do you want to remove existing container and re-build"
        if [ "$permission" ]; then
            # removing running containers
            echo "> Stoping existing container..."
            docker stop "$container_name"
            echo "> Removing existing container..."
            docker rm "$container_name"
            run_docker_container
        fi
    else
        echo "> No existing container found"
        run_docker_container
    fi
fi
