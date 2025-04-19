import { Spinner } from "flowbite-react";

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-4">
            <Spinner color="info" aria-label="Loading" />
        </div>
    );
}